// Static Web Apps API関数で環境変数を提供
module.exports = async function (context, req) {
    context.log('Config API called');

    const config = {
        apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://container-apps-sample.thankfulbush-1c2ea568.japaneast.azurecontainerapps.io'
    };

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: config
    };
};