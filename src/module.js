console.log('module.js')

async function f() {
    return  await Promise.resolve('assink working')
}
f().then(console.log);