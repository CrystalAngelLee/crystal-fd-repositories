import React, { useState } from "react";
import { consumptionType } from "./data";
import { getCurTplConfig } from "./config";
import "./index.css";

const Account = () => {
  const [takeHomePay, setTakeHomePay] = useState();
  const [grossSalary, setGrossSalary] = useState();

  const onTakeHomePayChange = ({ target: { value } }) => {
    setTakeHomePay(value);
  };
  const onGrossSalaryChange = ({ target: { value } }) => {
    setGrossSalary(value);
  };
  // 根据当月工资计算相应数据
  const getCurMonthAmount = (month, grossSalary, takeHomePay) => {
    console.log(
      "getCurTplConfig(grossSalary, takeHomePay)",
      getCurTplConfig(grossSalary, takeHomePay)
    );
    return {
      month,
      configs: JSON.stringify(getCurTplConfig(grossSalary, takeHomePay)),
    };
  };

  return (
    <div className="flex">
      <div>
        <div>类别</div>
        <table className="consumption-type">
          {consumptionType.map((c) => (
            <tr key={c.key}>
              <td style={{ width: "150px" }}>{c.key}</td>
              <td>{c.name}</td>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <div>
          当月工资：
          <input
            placeholder="请输入税前工资"
            type="number"
            value={grossSalary}
            onChange={onGrossSalaryChange}
          />
          <input
            placeholder="请输入税后工资"
            type="number"
            value={takeHomePay}
            onChange={onTakeHomePayChange}
          />
          <button onClick={getCurMonthAmount}>计算</button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Account;
