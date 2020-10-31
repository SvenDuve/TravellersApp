document.getElementById('clear').addEventListener('click', clear)


function clear(){
    document.getElementById('fullName').innerHTML = ''
    document.getElementById('subregion').innerHTML = ''
    document.getElementById('population').innerHTML = ''
    document.getElementById('HiTemperature').innerHTML = ''
    document.getElementById('LoTemperature').innerHTML = ''
    document.getElementById('pressure').innerHTML = ''
    document.getElementById('pict').src = ''
            
    return true
}

export { clear }