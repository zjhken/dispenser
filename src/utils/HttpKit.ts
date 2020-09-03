import {useCallback} from "react";

export function useHttp() {

	const baseUrl = process.env["REACT_APP_API_BASE_URL"]

	const doRequest = useCallback(async function (method: string, url: string, data?: any) {
		function setupUrl(url: string) {
			return baseUrl + url
		}

		let resp = await fetch(setupUrl(url), {
			body: !!data ? JSON.stringify(data) : "{}",
			cache: "no-cache",
			credentials: "omit",
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
			method,
			mode: "cors",
			redirect: "error",
			referrer: "no-referrer"
		})
		if (resp.status === 200) {
			return await resp.json()
		}
		else {
			const j = await resp.json()
			j.status = resp.status
			throw Error(j.errMsg)
		}
	}, [baseUrl])

	const post = useCallback(async function (url: string, data?: any) {
		return await doRequest("POST", url, data)
	}, [doRequest])


	async function get(url: string, data?: any) {
		return await doRequest("GET", url, data)
	}




	return {post, get}
}
