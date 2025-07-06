// Recipe download functionality
function downloadRecipe(recipeId) {
    // Get recipe data from page
    const recipeElement = document.getElementById('recipe-' + recipeId);
    if (!recipeElement) {
        return;
    }

    const recipeData = JSON.parse(recipeElement.dataset.recipe);

    // Prepare text with tags if present
    let exportText = recipeData.text;
    if (recipeData.tags && recipeData.tags.length > 0) {
        // Add tag commands at the beginning of the text
        const tagCommands = recipeData.tags.map(tag => `/tag ${tag}`).join('\n');
        exportText = recipeData.text + '\n' + tagCommands;
    }

    // Create export object with modified text
    const exportData = {
        version: recipeData.version,
        text: exportText,
        image: recipeData.image || null
    };

    // Create blob and download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/vnd.cookbook.recipe'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipeData.name}.recipe`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}