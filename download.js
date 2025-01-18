import html2canvas from "html2canvas";

export async function download(divRef) {
    const div = divRef.current;
    const canvas = await html2canvas(div, {
        useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "Generated-Meme.png"; 
    link.click();
}