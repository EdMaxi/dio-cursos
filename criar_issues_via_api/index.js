const axios = require('axios')
const https = require('https')
require("dotenv").config();

const CURSOS = require("./cursos.json")

let USERNAME = ''
const REPOSITORIO = 'dio-cursos'

const LABELS = [{
        name: 'Básico',
        color: 'B60205'
    },
    {
        name: 'Intermediário',
        color: 'FBCA04'
    },
    {
        name: 'Avançado',
        color: '0E8A16'
    }
]

const MILESTONES = [...new Set(CURSOS.map(c => c.formacao))].map(t => {
    return {
        title: t
    }
})

let ISSUES = CURSOS.map(i => {
    return {
        title: i.titulo,
        body: `<p align="center"><strong>Descrição:</strong> ${i.descricao}<br /><strong>Duração</strong>: ${i.duracao}<br /><a href="${i.capa}">link do logo do curso</a></p>`,
        labels: [i.nivel],
        milestone: i.formacao
    }
})

/*** CONSTANTES E VARIÁVEIS DO ESCOPO */
const INTERVALO_REQUEST = 2100
const OK = '✔'
const NOK = '✘'
const AUTH_TOKEN = "Bearer " + process.env.TOKEN
axios.defaults.baseURL = 'https://api.github.com'
axios.defaults.headers['Authorization'] = AUTH_TOKEN
axios.defaults.headers.contentType = "application/vnd.github.v3+json"
axios.defaults.timeout = 1000 * 10 //10 segundos de timeout
const api = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

/*** FUNÇÕES DE APOIO */
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

const handleErrors = (e) => {
    let output = ''
    if (e.response) {
        output += `Request: ${e.request.path}\n`
        output += `Erro Código: ${e.response.status} - ${e.response.data.message}`
    } else if (e.request) {
        output += `Request: ${e.request}`
    } else {
        output += `Erro: ${e.message}`
    }
    console.log(output)
}

/*** FUNÇÕES DA API */

async function apiSetup() {

    try {
        // Criando Labels
        console.log(`Criando Labels`)
        for (let i = 0; i < LABELS.length; i++) {
            await pause(INTERVALO_REQUEST)
            await apiCreateLabel(REPOSITORIO, LABELS[i])
        }

        // Criando Milestones
        console.log(`Criando Milestones:`)
        for (let i = 0; i < MILESTONES.length; i++) {
            await pause(INTERVALO_REQUEST)
            await apiCreateMilestone(REPOSITORIO, MILESTONES[i])
        }

        // Relacionando Issues e Milestones
        const reqMilestones = await api.get(`/repos/${USERNAME}/${REPOSITORIO}/milestones`)
        if (reqMilestones.data.length) {
            for (let i = 0; i < reqMilestones.data.length; i++) {
                for (let j = 0; j < ISSUES.length; j++) {
                    if (ISSUES[j].milestone === reqMilestones.data[i].title) {
                        ISSUES[j].milestone = reqMilestones.data[i].number
                    }
                }
            }
        }

        // Criando Issues com Label e Milestones
        for (let i = 0; i < ISSUES.length; i++) {
            await pause(INTERVALO_REQUEST)
            const issue = ISSUES[i]
            await apiCreateIssue(REPOSITORIO, issue)
        }
        console.log(`Parabéns, DEU TUDO CERTO!`)

    } catch (error) {
        handleErrors(error)
    }
}

async function apiCreateIssue(repo, issue) {
    let output =`Criando Issue '${issue.title}'`

    try {
        await api.post(`/repos/${USERNAME}/${repo}/issues`, issue)
        console.log(output + OK)
    } catch (error) {
        console.log(output + NOK)
        handleErrors(error)
    }
}

async function apiCreateLabel(repo, label) {
    let output = `Criando label '${label.name}' `

    try {
        await api.post(`/repos/${USERNAME}/${repo}/labels`, label)
        console.log(output + OK)
    } catch (error) {
        console.log(output + NOK)
        handleErrors(error)
    }
}

async function apiCreateMilestone(repo, milestone) {
    let output = `Criando Milestone '${milestone.title}' `

    try {
        const requestCreateMilestone = await api.post(`/repos/${USERNAME}/${repo}/milestones`, milestone)
        console.log(output + `${OK} '#${requestCreateMilestone.data.number}' `)
    } catch (error) {
        handleErrors(error)
    }
}

// apiSetup()

// apiListIssuesFromRepo(REPOSITORIO)
// apiListLabelsFromRepo(REPOSITORIO)
// apiListMilestonesFromRepo(REPOSITORIO)
// getRateLimit()
// gapiMe()

;(async () => {
    await graphDefineUsername()
    await apiSetup()
})();

/* TESTES E MAIS TESTES, APRENDENDO A UTILIZAR A API DO GITHUB */
async function graphDefineUsername() {
    try {
        const q = {
            query: `
                query {
                    viewer {
                        login
                    }
                }

            `
        }
        const r = await api.post('/graphql', q)
        USERNAME = r.data.data.viewer.login
        // console.log(JSON.stringify(r.data.data.viewer.login))
    } catch (error) {
        handleErrors(error)
    }
}

function showFancyIssue(issue) {
    let output = []
    let _labels = issue.labels != undefined && issue.labels.length ? issue.labels.map(l => l.name).join(', ') : 'Nenhum'
    let _milestone = issue.milestone != undefined ? issue.milestone.title : 'Nenhum'
    output.push(`Issue: ${issue.title}`)
    output.push(`- Labels: ${_labels}`)
    output.push(`- Milestone: ${_milestone}`)
    
    output.forEach(e => console.log(e))
}

async function apiCloseIssue(repo, number) {
    console.log(`Fechando Issue #'${number}'`)

    try {
        await api.patch(`/repos/${USERNAME}/${repo}/issues/${number}`, { state: 'closed'})
        console.log(` - Sucesso`)
    } catch (error) { handleErrors(error) }
}

async function apiDeleteLabel(repo, name) {
    console.log(`Excluindo label '${name}'`)

    try {
        const requestDeleteLabel = await api.delete(encodeURI(`/repos/${USERNAME}/${repo}/labels/${name}`))
        if (requestDeleteLabel.status == 204) {
            console.log(` - Sucesso`)
        } else {
            console.log(` - Erro`)
        }
    } catch (error) { handleErrors(error) }    
}

async function apiListLabelsFromRepo(repo) {
    console.log(`Listando Labels:`)
    const requestListLabels = await api.get(`/repos/${USERNAME}/${repo}/labels`)
    if (!requestListLabels.data.length) {
        console.log('Não há Labels')
        for (let i = 0; i < LABELS.length; i++) {
            await apiCreateLabel(repo, LABELS[i])
        }        
    } else {
        console.log(`Excluindo Labels de teste`)
        for (let i = 0; i < requestListLabels.data.length; i++) {
            await apiDeleteLabel(repo, requestListLabels.data[i].name)
        }
    }
}

async function apiDeleteMilestone(repo, milestone_number) {
    console.log(`Excluindo Milestone '#${milestone_number}'`)

    try {
        await api.delete(encodeURI(`/repos/${USERNAME}/${repo}/milestones/${milestone_number}`))
        console.log(' - Sucesso')
    } catch (error) { handleErrors(error) }
}

async function apiListMilestonesFromRepo(repo) {
    console.log(`Listando Milestones:`)
    
    try {
        const requestListMilestones = await api.get(`/repos/${USERNAME}/${repo}/milestones`)
        if (!requestListMilestones.data.length) {
            console.log('Não há Milestones')            
            for (let i = 0; i < MILESTONES.length; i++) {
                await apiCreateMilestone(repo, MILESTONES[i])
            }
        } else {
            console.log(`Excluindo Milestones de teste`)
            for (let i = 0; i < requestListMilestones.data.length; i++) {
                await apiDeleteMilestone(repo, requestListMilestones.data[i].number)
            }
        }
    } catch (error) { handleErrors (error) }
}

async function apiListIssuesFromRepo(repo) {
    console.log(`Listando Issues:`)
    
    try {
        const requestListIssues = await api.get(`/repos/${USERNAME}/${repo}/issues`)
        if (!requestListIssues.data.length) {
            console.log('Não há Issues')
            for (let i = 0; i < 3; i++) {                
                const issue = ISSUES[i]
                await apiCreateIssue(repo, issue)
            }
        } else {
            console.log(`Excluindo Issues de teste`)
            for (let i = 0; i < 3; i++) {
                showFancyIssue(requestListIssues.data[i])
                await apiCloseIssue(repo, requestListIssues.data[i].number)
                // await gDeletessue(repo, requestListIssues.data[i].id)
            }
        }
    } catch (error) { handleErrors (error) }
}

async function getRateLimit() {
    console.log('Limites da API: \n')
    try {
        const limits = await api.get('/rate_limit')
        console.log(limits.data.rate)
    } catch (error) {
        console.log(handleErrors(error))
    }
}


function showFancyLabel(label) {
    let output = `Label: ${label.name}, cor: ${label.color}`
    console.log(output)
}

function showFancyMilestone(milestone) {
    let output = `Milestone: ${milestone.title} | Número: ${milestone.number}`
    console.log(output)
}

/*
// JS pra coletar cursos da DIO
let cursos = document.querySelectorAll('.course.card')
let cursosJSON = []
for (i of cursos) {
cursosJSON.push(
{ 
    formacao: i.closest('.track-row').querySelector('h3').innerText,
    capa: i.querySelector('.card-img-top').src,
    titulo: i.querySelector('.card-body .description h6').innerText,
    descricao: i.querySelector('.card-body .description p').innerText,
    nivel: i.querySelector('.card-footer .d-flex:nth-child(1) span').innerText,
    duracao: i.querySelector('.card-footer .d-flex:nth-child(2) span').innerText
})
}
console.log(JSON.stringify(cursosJSON))
*/