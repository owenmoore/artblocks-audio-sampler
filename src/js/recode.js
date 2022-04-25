const prepend = `
const audio = document.querySelector('audio');
const recorder = new Tone.Recorder();

function handleMessage(e) {
    switch (e.data['command']) {
        case 'startRecord':
            recorder.start();
            break;
        case 'stopRecord':
            setTimeout( async () => {
                const recording = await recorder.stop();
                const url = URL.createObjectURL(recording);
                const anchor = document.createElement("a");
                anchor.download = "recording.webm";
                anchor.href = url;
                anchor.click();
                audio.src = url;
            }, 100);
            break;
        default:
            break;
    }
}
window.addEventListener('message', handleMessage);
`

export default (code, id) => {
    code = prepend + code

    if (id === '296') {
        code = code.replace(
            `,s=D.createElement("style");s.innerHTML="body,html{overflow:hidden;background:#333}body{margin:0;display:flex;justify-content:center;align-items:center}C{display:block;background:#000}",B.appendChild(s)`,
            ``,
        )
        code = code.replace(`C=D.createElement("canvas")`, `C=D.getElementById('canvas')`)
        code = code.replace(`,B.appendChild(C)`, ``)
        code = code.replace(`let e=W.innerWidth,a=W.innerHeight`, `let e=${500},a=${500}`)
        code = code.replace(`frv=new Tone.Reverb(15).connect(flw);`, `frv=new Tone.Reverb(15).connect(flw);fwd.connect(recorder);`)
    }
    return code
}
