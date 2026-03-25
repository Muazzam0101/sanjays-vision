from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

X_train = [
    "sql injection form error payload invalid",
    "xss script payload form error",
    "buffer overflow long string form error",
    "broken link 404 http error",
    "js error global execution runtime",
    "ui issue missing src property",
    "performance issue slow dom load",
    "seo issue missing title",
    "seo issue missing meta description",
    "accessibility issue missing alt text",
    "ux issue small click target"
]

y_train = [
    "critical",
    "critical",
    "critical",
    "major",
    "major",
    "major",
    "major",
    "minor",
    "minor",
    "minor",
    "minor"
]

_classifier = make_pipeline(TfidfVectorizer(ngram_range=(1, 2)), MultinomialNB())
_classifier.fit(X_train, y_train)

def classify_severity_ml(text: str) -> str:
    """Predict dynamically: critical, major, minor"""
    return _classifier.predict([text.lower()])[0]
