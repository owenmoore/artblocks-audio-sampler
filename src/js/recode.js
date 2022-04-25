export default (code, projectNum) => {
    if (projectNum === '296') {
        code = code.replace(
            `,s=D.createElement("style");s.innerHTML="body,html{overflow:hidden;background:#333}body{margin:0;display:flex;justify-content:center;align-items:center}C{display:block;background:#000}",B.appendChild(s)`,
            ``,
        )
        code = code.replace(`C=D.createElement("canvas")`, `C=D.getElementById('canvas')`)
        code = code.replace(`,B.appendChild(C)`, ``)
        code = code.replace(`let e=W.innerWidth,a=W.innerHeight`, `let e=${500},a=${500}`)
    }
    return code
}
