export function convertToRgbaCSS( color ) {
    let colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    return colorString;
}

export function designBackground( designCon ) {
    let backgroundStyle = {
    }
    if (designCon.selectedImageUrl !== null) {
        backgroundStyle.background = `linear-gradient(rgba(255,255,255,${designCon.opacity}), rgba(255,255,255,${designCon.opacity})), url('${designCon.selectedImageUrl}') 50%/cover`;
    } else {
        backgroundStyle.background = convertToRgbaCSS(designCon.backgroundColor);
    }

    designCon.backgroundStyle = backgroundStyle;
}

export function validateImageUrl( url ) {
	return url.match(/^http.*\.(jpeg|jpg|png)$/) != null
}