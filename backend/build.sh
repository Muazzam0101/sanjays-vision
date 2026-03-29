#!/usr/bin/env bash

# Install dependencies from requirements.txt
pip install -r requirements.txt

# Install Playwright browser dependencies (for Linux core system libraries)
playwright install-deps chromium

# Install the chromium browser itself
playwright install chromium