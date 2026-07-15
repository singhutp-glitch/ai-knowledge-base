import React from "react";

export function preprocessCitations(markdown) {
    return markdown.replace(
        /\[(\d+)\]/g,
        (_, id) => `<citation id="${id}"></citation>`
    );
}