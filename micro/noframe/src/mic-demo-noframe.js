/**
 * !!! 在每一个微应用的入口文件中规定需要导出生命周期函数
 * !!! 生命周期函数必须返回 Promise
 */

let div_container = null

export async function bootstrap () {
    console.log('I am starting up...')
}

export async function mount () {
    console.log("I'm mounting...")
    div_container = document.createElement('div')
    div_container.innerHTML = 'hello world'
    document.body.appendChild(div_container)
}

export async function unmount () {
    console.log('I will be unmount')
    document.body.removeChild(div_container)
}