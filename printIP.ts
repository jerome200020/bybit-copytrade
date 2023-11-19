import axios from "axios";

async function main() {
  axios
    .get("https://api.ipify.org/?format=json")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.error(err));
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
