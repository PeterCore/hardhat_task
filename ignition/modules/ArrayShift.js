const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("ArrayModule", (m) => {
    const contract = m.contract("ArrayShift", []);

    return { contract };
});