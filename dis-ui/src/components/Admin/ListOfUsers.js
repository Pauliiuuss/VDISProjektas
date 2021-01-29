import React from 'react';

const ListOfUsers = () => {
  return (
    <div>
      <h5 className="text-center mt-5">Naudotojų sąrašas</h5>
      <table className="table col-12 col-sm-12 col-md-6 col-lg-6 mt-3 mx-auto">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Prisijungimo vardas</th>
            <th scope="col">Rolė</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ListOfUsers;
