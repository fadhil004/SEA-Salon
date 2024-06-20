const { sequelize } = require("./models")

async function main(){
    await sequelize.sync({force: true})
}

main().catch(err => console.log(err))