

exports.routes = {
	name: "Email Subscirption",
	category: "Email",
	path: "/api/testing", 
	parameter: ["subject", "to", "from", "text", "message"],
	example: {},
	method: "get",
	authorization: true,
	execution: async (req, res) => {  
		try {
			ResponseTrue(res, "Berhasil kak.");
		} catch (err) {
			ResponseFalse(res, err.message);
		}
	},
};
