const prepend = `
const actx  = Tone.context;
const dest  = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);
const audio = document.querySelector('audio');
const chunks = [];

function downloadAudio(blob){
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'artblocks-audio-sample.ogg';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function handleMessage(e) {
    switch (e.data['command']) {
        case 'startRecord':
            recorder.start();
            break;
        case 'stopRecord':
            recorder.stop();
            break;
        default:
            break;
    }
}
window.addEventListener('message', handleMessage);

recorder.ondataavailable = evt => chunks.push(evt.data);

recorder.onstop = evt => {
    let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus' });
    audio.src = URL.createObjectURL(blob);
    downloadAudio(blob);
};
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
        code = code.replace(`frv=new Tone.Reverb(15).connect(flw);`, `frv=new Tone.Reverb(15).connect(flw);fwd.connect(dest);`)
    }
    return code
}
