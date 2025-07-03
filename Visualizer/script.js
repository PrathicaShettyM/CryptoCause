let provider, signer, contract;

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "campaigns",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "target",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountCollected",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "image",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_target",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_image",
        "type": "string"
      }
    ],
    "name": "createCampaign",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_tokenURI",
        "type": "string"
      }
    ],
    "name": "donateToCampaign",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCampaigns",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "target",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountCollected",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "image",
            "type": "string"
          },
          {
            "internalType": "address[]",
            "name": "donators",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "donations",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Funding.Campaign[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getDonators",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_donor",
        "type": "address"
      }
    ],
    "name": "getMyCertificates",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "getTokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numberOfCampaigns",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ownedTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenIdCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokenURIs",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]


function drawForceGraph(campaigns) {
  const container = document.getElementById("graph-container");
  container.innerHTML = "";

  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const zoom = d3.zoom()
    .scaleExtent([0.5, 4])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  svg.call(zoom);

  const g = svg.append("g");

  const nodes = [];
  const links = [];

  campaigns.forEach((campaign, index) => {
    const cId = `Campaign-${index}`;
    nodes.push({ id: cId, label: campaign.title, type: "campaign" });

    const donors = campaign.donators?.length ? campaign.donators : [campaign.owner];
    const donations = campaign.donations?.length ? campaign.donations : [];

    donors.forEach((donor, i) => {
      const dId = `${cId}-Donor-${i}`;
      const donation = donations[i] || "0";
      const hash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(donor.toLowerCase() + donation.toString()));

      nodes.push({ id: dId, label: donor.slice(0, 6), type: "donor", hash });
      links.push({ source: dId, target: cId, hash });
    });
  });

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = g.append("g")
    .attr("stroke", "#aaa")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", 1.5)
    .attr("data-link-hash", d => d.hash || "");

  const node = g.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 8)
    .attr("fill", d => d.type === "campaign" ? "#00bfff" : "#32cd32")
    .attr("data-hash", d => d.hash || "")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  const label = g.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .text(d => d.label)
    .attr("x", 12)
    .attr("y", 4)
    .style("font-size", "12px")
    .style("fill", "#fff");

  const tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("text-align", "left")
    .style("padding", "8px")
    .style("font", "12px sans-serif")
    .style("background", "rgba(0,0,0,0.8)")
    .style("color", "#fff")
    .style("border-radius", "8px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  node.on("mouseover", function (event, d) {
    if (d.hash) {
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip.html(`Hash: ${d.hash}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    }
  }).on("mouseout", function () {
    tooltip.transition().duration(500).style("opacity", 0);
  });

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x = Math.max(0, Math.min(width, d.source.x)))
      .attr("y1", d => d.source.y = Math.max(0, Math.min(height, d.source.y)))
      .attr("x2", d => d.target.x = Math.max(0, Math.min(width, d.target.x)))
      .attr("y2", d => d.target.y = Math.max(0, Math.min(height, d.target.y)));

    node
      .attr("cx", d => d.x = Math.max(10, Math.min(width - 10, d.x)))
      .attr("cy", d => d.y = Math.max(10, Math.min(height - 10, d.y)));

    label
      .attr("x", d => d.x + 10)
      .attr("y", d => d.y);
  });

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

async function verifyDonation() {
  const addr = document.getElementById("verifyAddress").value.trim().toLowerCase();
  const amountStr = document.getElementById("verifyAmount").value.trim();
  const resultEl = document.getElementById("verifyResult");
  const hashEl = document.getElementById("hashDisplay");

  if (!addr || !amountStr) {
    resultEl.textContent = "❌ Please enter both address and amount.";
    resultEl.classList.add("error");
    return;
  }

  try {
    const amount = ethers.utils.parseEther(amountStr).toString(); // normalize to wei
    const hashInput = addr + amount;

    // Animation: show input conversion
    resultEl.innerHTML = `
      🔢 Converting ETH to Wei...<br/>
      ➡️ ${amountStr} ETH = ${amount} wei<br/>
      🧮 Hashing: <code>${hashInput}</code>...<br/>
    `;

    await new Promise(r => setTimeout(r, 1000)); // simulate delay

    const hash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(hashInput));
    hashEl.textContent = hash;

    resultEl.innerHTML += `🔏 Hash: <code>${hash}</code><br/>`;

    const foundNode = document.querySelector(`[data-hash="${hash}"]`);
    const matchingLink = document.querySelector(`[data-link-hash="${hash}"]`);

    if (foundNode && matchingLink) {
      resultEl.innerHTML += "✅ <b style='color:lightgreen'>Verified!</b><br/>";
      resultEl.classList.remove("error");

      // Animate the matching link
      matchingLink.classList.add("flash-link");
      setTimeout(() => {
        matchingLink.classList.remove("flash-link");
      }, 3000);
    } else {
      resultEl.innerHTML += "❌ <b style='color:salmon'>Hash not found</b>. Double-check address & amount.";
      resultEl.classList.add("error");
    }

  } catch (err) {
    console.error(err);
    resultEl.textContent = "❌ Error computing hash. Check your input.";
    resultEl.classList.add("error");
  }
}


async function fetchAndRenderGraph() {
  try {
    const campaigns = await contract.getCampaigns();
    drawForceGraph(campaigns);
  } catch (err) {
    console.error("Error fetching campaigns:", err);
  }
}


async function connect() {
  if (!window.ethereum) return alert("Install MetaMask");

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  console.log("Connected to:", await signer.getAddress());

  fetchAndRenderGraph();
}


// Auto-refresh every 15 seconds
setInterval(() => {
  if (contract) fetchAndRenderGraph();
}, 15000);