const axios = require('axios');

const LCD = "http://localhost:1317";

async function get(path, params) {
    const response = await axios.get(`${LCD}/${path}`, {params});
    return response.data
}

async function post(path, params) {
    const response = await axios.post(`${LCD}/${path}`, params);
    return response.data
}

function getNodeInfo() {
    return get('node_info');
}

// also not working
async function getGenesisAccounts() {
    const res = get('genesis');
    return res;
}


async function getSyncStatus() {
    const res = await get('syncing');
    return res.syncing;
}

async function getTx(hash) {
    const res = await get(`txs/${hash}`);
    return res;
}

// this is not enabled? why?
async function getKeys() {
    const res = await get(`keys`);
    return res;
}

async function getAccount(addr) {
    const res = await get(`auth/accounts/${addr}`);
    return res.result.value;
}

async function broadcast(tx) {
    const res = await post(`txs`, {tx, mode: 'block'});
    return res;
}

const invalidTx = {
      "msg": [
          {
              "type":"cosmos-sdk/MsgSend",
              "value": {
                  "from_address":"cosmos1utdqpj4j6aa7nzry563ukngt57szrp95q9eptk",
                  "to_address":"cosmos18wenchx2je3shlynjf82zjrwuaq6lsqj8m502l",
                  "amount":[
                      {
                          "denom":"stake",
                          "amount":"1"
                      }
                   ]
                }
            }
        ],
      "fee": {
        "amount": [],
        "gas": "200000"
      },
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "Aoyj0D0RFGyh32dO04VRefAX8nOVwJRftSWD0PhcHtg0"
          },
          "signature": "v0T2iaFQb8VoOLwPml/3+4aiA+M0LS+FbKa1XNjJLo8m4zmsUHqXrvptGfH7yyD5YkeQRPTtULnRxQ9vMlvAWQ=="
        }
      ],
      "memo": "invalid sample"
    };

async function demo() {
    const info = await getNodeInfo();
    console.log('Network:', info.node_info.network);
    const sync = await getSyncStatus();
    console.log('Sync Status:', sync);

    // const genesis = await getGenesisAccounts();
    // console.log('Genesis:', genesis);

    const acct = await getAccount("cosmos1xgl000qa994750r5u4528n9pjzd3rcl7h6xkfc");
    console.log('Account:', acct);

    const out = await broadcast(invalidTx);
    console.log(out);
}



demo().catch(e => console.log(`ERROR ${e.response.status}: ${e.config.url}`));