#!/bin/bash

echo "Testing translation API endpoints..."

echo "1. Testing Estonian translations:"
curl -s "http://localhost:8000/api/v1/locale/translations/api?locale=et" | jq -r '.data.translations.wordbase.importForm.importButton'

echo "2. Testing English translations:"
curl -s "http://localhost:8000/api/v1/locale/translations/api?locale=en" | jq -r '.data.translations.wordbase.importForm.importButton'

echo "3. Testing navigation titles:"
echo "ET: $(curl -s "http://localhost:8000/api/v1/locale/translations/api?locale=et" | jq -r '.data.translations.navigation.title')"
echo "EN: $(curl -s "http://localhost:8000/api/v1/locale/translations/api?locale=en" | jq -r '.data.translations.navigation.title')"

echo "4. Testing common search button:"
echo "ET: $(curl -s "http://localhost:8000/api/v1/locale/translations/api?locale=et" | jq -r '.data.translations.common.search')"
echo "EN: $(curl -s "http://localhost:8000/api/v1/locale/translations/api?locale=en" | jq -r '.data.translations.common.search')"
