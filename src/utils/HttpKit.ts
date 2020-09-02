export function useHttp() {

	const baseUrl = process.env["REACT_APP_API_BASE_URL"]

	function setupUrl(url: string) {
		return baseUrl + url
	}

	async function post(url: string, data?: any) {
		await doRequest("POST", url, data)
	}

	async function get(url: string, data?: any) {
		await doRequest("GET", url, data)
	}


	async function doRequest(method: string, url: string, data?: any) {
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
	}

	return {post, get,}
}
