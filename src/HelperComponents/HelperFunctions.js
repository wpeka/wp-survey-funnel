export function convertToRgbaCSS( color ) {
    let colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    return colorString;
}

export function designBackground( designCon ) {
    let backgroundStyle = {
        padding: `20px`,
    }
    console.log(designCon.selectedImageUrl);
    if (designCon.selectedImageUrl !== null) {
        backgroundStyle.background = `linear-gradient(rgba(255,255,255,${designCon.opacity}), rgba(255,255,255,${designCon.opacity})), url('${designCon.selectedImageUrl}') 50%/cover`;
    } else {
        backgroundStyle.background = convertToRgbaCSS(designCon.backgroundColor);
    }

    designCon.backgroundStyle = backgroundStyle;
}