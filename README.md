# stock-tracker
Programming evaluation. This application uses modern technology to track the values of three stocks since 1/1/2019

This application utilizes a Node.js backend and React frontend. 

This API is used to retrieve stock pricing data: https://financialmodelingprep.com/developer/docs/ 

Outputs as a CSV file. This code does NOT take into account any type of stock split or similar action.

To Run:

```sh
npm install
npm start
```

To create a production build:

```sh
npm run build-prod
```

Future Potential:
UI upon request or otherwise (would be a good candidate for Next.js experiment)
Select stocks from https://financialmodelingprep.com/developer/docs/#Symbols-List word cloud/list

Include stock splits.
