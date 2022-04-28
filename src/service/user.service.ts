import connection from "../config/database";


export default {
    create: (data: any, callBack: any) => {
      console.log(typeof data.phone)
      connection.query(
        `insert into user2(firstname, lastname, email, password, phone) 
                  values('${data.firstname}','${data.lastname}','${data.email}','${data.password}',${data.phone})`,
        (error : any, results: any) => {
          callBack(error, results);
        }
      );
    },
    getUserByUserEmail: (email: string, callBack: any) => {
      connection.query(
        `select * from user2 where email = ?`,
        [email],
        (error: any, results: any, fields: any) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
    },
    getUsers: (callBack: any) => {
      connection.query(
        `select id,firstName,lastName,email from user2`,
        (error: any, results: any, fields: any) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    },
  };
