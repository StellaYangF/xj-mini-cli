import request from 'request';
import { getAll } from './rc'
import downLoadGit from 'download-git-repo';
import { DOWNLOAD } from './constants'

let fetch = async (url) => {
    return new Promise((resolve, reject) => {
        let config = {
            url,
            method: 'get',
            headers: {
                'user-agent': 'xxx'
            }
        }
        request(config, (err, response, body) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(JSON.parse(body))
        })
    })
}


export let tagList = async (repo) => {
    let config = await getAll();
    let api = `https://api.github.com/repos/${config.registry}/${repo}/tags`;
    try {
        return await fetch(api);
    } catch (error) {
        console.log(error, 'fetch tagList error')   ;
    }
}

//链接地址：https://api.github.com/orgs/xj-cli/repos 项目
export let repoList = async () => {
    let config = await getAll();
    let api = `https://api.github.com/${config.type}/${config.registry}/repos`;
    try {
        return await fetch(api);
    } catch (error) {
        console.log(error, 'fetch repoList error')   ;
    }
}


export let download = async (src, dest) => {
    return new Promise((resolve, reject) => {
        downLoadGit(src, dest, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}


export let downloadLocal = async (project, version) => {
    let config = await getAll()
    let api = `${config.registry}/${project}`;
    if (version) {
        api += `#${version}`;
    }
    return await download(api, DOWNLOAD + '/' + project);
}