// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const solc = require("solc");


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  var solc = require("solc");

  var input = {
    language: "Solidity",
    sources: {
      "test.sol": {
        content: "contract C { function f() public { } }",
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input)));

 // `output` here contains the JSON output as specified in the documentation
  // for (var contractName in output.contracts["test.sol"]) {
  //   console.log(
  //     contractName +
  //       ": " +
  //       output.contracts["test.sol"][contractName].evm.bytecode.object
  //   );
  // }

  const contractName = 'C';
  const bytecode = output.contracts["test.sol"][contractName].evm.bytecode.object

  res.status(200).json({ bytecode: bytecode});
}
