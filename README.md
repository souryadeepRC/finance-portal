# [My Gullak](https://my-gullak.netlify.app/)

https://my-gullak.netlify.app/

### Web Application for Finance Management
Build in `React-TypeScript-SASS-MaterialUI` and deployed in `Netlify`

This application provides economic data and information all in one place. It acts as an information hub for users or clients, often individual investors, and provides up-to-date financial information and data to make investment decisions.

## Implemented Technologies

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![image](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![image](https://img.shields.io/badge/Redux%20saga-86D46B?style=for-the-badge&logo=redux%20saga&logoColor=999999)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![image](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![image](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white)
![image](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![image](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

 <details> 
    <summary>Versions</summary>
    
| Spec        | Version |
|-------------|---------|
| React Js    | 18.2.0  |
| React-Redux | 8.1.3   |
|React-Router | 6.16.0  |
|TypeScript   | 4.9.5   |
|Material UI  | 5.14.12 |
|SASS         |1.68.0   |

 </details>
  
## Install Process
```Typescript
$ git clone https://github.com/souryadeepRC/finance-portal.git
$ npm install
$ npm run start
```
# Features
 
## Home Loan
> [!NOTE]
> By entering
`loan amount`
`loan tenure`
`loan interest rate`
`loan start period` users can enjoy the subsequent advantages.

> **Loan Amount Breakup**

User can know about their home loan `Monthly emi`, `Completion month-year`, `interest paid amount` & a likable `Pie chart` view of paid amount breakup.

> **Loan Amortization**

Users can select a specific year and get to know about paid `principal`, `interest`, `outstanding balance`, and `remaining year` for that selected year. Also `detailed month-wise breakup` for that particular year.

> **Loan Pre-Payment**

Users can choose any of the options to pre-pay the home loan earlier

- [ ] **By paying Principal Amount ::**
      Users can choose a precise amount to pay in the form of a principal after a specific month and a specific year.
      Also, the user can expand the principal amount every year with a specific percentage from the last year

- [ ] **By Increasing Emi ::**
      Users can decide to raise the monthly emi after a specific month and year onwards.

- [ ] **By paying Principal Amount & Increasing Emi ::**
      Users can choose a specific amount to pay in the form of principal and increase the monthly emi after a specific month and year.

Based on the preference, the user can see the loan break up.
It will come with a prediction of
`how fast the loan will get completed`
`how many rupees user can save in paid interest payments`
