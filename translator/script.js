const sourceText = document.getElementById("source-text");
const targetText = document.getElementById("target-text");
const sourceLanguage = document.getElementById("source-language");
const targetLanguage = document.getElementById("target-language");
const swapButton = document.getElementById("swap-button");
const clearButton = document.getElementById("clear-button");
const copyButton = document.getElementById("copy-button");
const statusBar = document.getElementById("status-bar");
const statusTextEl = document.getElementById("status-text");
const charCount = document.getElementById("char-count");
const detectedBadge = document.getElementById("detected-language");
const errorToast = document.getElementById("error-toast");

const LANGUAGE_NAMES = {
    en: "English",
    ja: "Japanese",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ko: "Korean",
    zh: "Chinese",
    ru: "Russian",
    ar: "Arabic",
    hi: "Hindi",
    vi: "Vietnamese",
    nl: "Dutch",
    pl: "Polish",
    tr: "Turkish",
};

let translateTimer = null;
let isTranslating = false;

// Show error toast
const showError = (message) => {
    errorToast.textContent = message;
    errorToast.style.display = "block";
    setTimeout(() => {
        errorToast.style.display = "none";
    }, 5000);
};

// Show status
const showStatus = (text) => {
    statusTextEl.textContent = text;
    statusBar.style.display = "flex";
};

// Hide status
const hideStatus = () => {
    statusBar.style.display = "none";
};

// Check if Translator API is supported
const isTranslatorSupported = () => {
    return "Translator" in self;
};

// Check if Language Detector API is supported
const isLanguageDetectorSupported = () => {
    return "LanguageDetector" in self;
};

// Detect language
const detectLanguage = async (text) => {
    if (!isLanguageDetectorSupported()) {
        console.warn("Language Detector API is not supported.");
        return "en";
    }

    const detector = await LanguageDetector.create({
        monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
                console.log(`Language Detector model: ${Math.floor(e.loaded * 100)}%`);
            });
        },
    });

    const results = await detector.detect(text);
    return results[0]?.detectedLanguage || "en";
};

// Create translator instance
const createTranslator = async (sourceLang, targetLang) => {
    const availability = await Translator.availability({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
    });

    if (availability === "unavailable") {
        const sourceName = LANGUAGE_NAMES[sourceLang] || sourceLang;
        const targetName = LANGUAGE_NAMES[targetLang] || targetLang;
        throw new Error(`Translation from ${sourceName} to ${targetName} is not available.`);
    }

    const translator = await Translator.create({
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
                showStatus(`Downloading translation model... ${Math.floor(e.loaded * 100)}%`);
            });
        },
    });

    return translator;
};

// Translate text
const translate = async () => {
    const text = sourceText.value.trim();
    if (!text) {
        targetText.value = "";
        copyButton.style.display = "none";
        return;
    }

    if (!isTranslatorSupported()) {
        showError("The Translator API is not supported in this browser. Please use Chrome with Built-in AI enabled.");
        return;
    }

    if (isTranslating) return;
    isTranslating = true;

    try {
        // Detect or use selected source language
        let sourceLang = sourceLanguage.value;

        if (sourceLang === "auto") {
            showStatus("Detecting language...");
            sourceLang = await detectLanguage(text);
            const langName = LANGUAGE_NAMES[sourceLang] || sourceLang;
            detectedBadge.textContent = `Detected: ${langName}`;
            detectedBadge.style.display = "inline";
        } else {
            detectedBadge.style.display = "none";
        }

        const targetLang = targetLanguage.value;

        // Don't translate if source and target are the same
        if (sourceLang === targetLang) {
            targetText.value = text;
            hideStatus();
            copyButton.style.display = "flex";
            isTranslating = false;
            return;
        }

        showStatus("Translating...");
        targetText.value = "";

        const translator = await createTranslator(sourceLang, targetLang);
        const stream = translator.translateStreaming(text);
        let result = "";

        for await (const chunk of stream) {
            result += chunk;
            targetText.value = result;
        }

        copyButton.style.display = "flex";
    } catch (error) {
        console.error("Translation error:", error);
        showError(error.message || "An error occurred during translation.");
    } finally {
        hideStatus();
        isTranslating = false;
    }
};

// Debounced translate
const debouncedTranslate = () => {
    if (translateTimer) {
        clearTimeout(translateTimer);
    }
    translateTimer = setTimeout(translate, 800);
};

// Swap languages
const swapLanguages = () => {
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;

    // Cannot swap if source is "auto"
    if (sourceLang === "auto") {
        return;
    }

    sourceLanguage.value = targetLang;
    targetLanguage.value = sourceLang;

    // Also swap text
    const tempText = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = tempText;

    updateCharCount();
    updateClearButton();
    updateCopyButton();

    if (sourceText.value.trim()) {
        debouncedTranslate();
    }
};

// Copy translation
const copyTranslation = async () => {
    const text = targetText.value;
    if (!text) return;

    try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const originalTitle = copyButton.title;
        copyButton.title = "Copied!";
        copyButton.style.color = "var(--color-primary)";
        setTimeout(() => {
            copyButton.title = originalTitle;
            copyButton.style.color = "";
        }, 1500);
    } catch {
        showError("Failed to copy to clipboard.");
    }
};

// Clear source text
const clearSource = () => {
    sourceText.value = "";
    targetText.value = "";
    detectedBadge.style.display = "none";
    updateCharCount();
    updateClearButton();
    updateCopyButton();
    sourceText.focus();
};

// Update character count
const updateCharCount = () => {
    charCount.textContent = sourceText.value.length;
};

// Update clear button visibility
const updateClearButton = () => {
    clearButton.style.display = sourceText.value.length > 0 ? "flex" : "none";
};

// Update copy button visibility
const updateCopyButton = () => {
    copyButton.style.display = targetText.value.length > 0 ? "flex" : "none";
};

// Event listeners
sourceText.addEventListener("input", () => {
    updateCharCount();
    updateClearButton();
    debouncedTranslate();
});

sourceLanguage.addEventListener("change", () => {
    if (sourceLanguage.value !== "auto") {
        detectedBadge.style.display = "none";
    }
    if (sourceText.value.trim()) {
        debouncedTranslate();
    }
});

targetLanguage.addEventListener("change", () => {
    if (sourceText.value.trim()) {
        debouncedTranslate();
    }
});

swapButton.addEventListener("click", swapLanguages);
clearButton.addEventListener("click", clearSource);
copyButton.addEventListener("click", copyTranslation);

// Focus source input on load
sourceText.focus();
