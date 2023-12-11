//create a component that can accept number of cols and display data based on that.

type TOrders = {
  heading: string[];
  body: {
    _id: string;
    payment_status: string;
    total: string;
    email: string;
  }[];
  type: "orders";
};

type TProfile = {
  heading: string[];
  body: {
    firstName: string;
    lastName: string;
    role: "user" | "admin";
    email: string;
  };
  type: "profile";
};

type TTable = TOrders | TProfile;

const Table = ({ heading, body, type }: TTable) => {
  return (
    <table className="w-full mt-6 table-auto">
      <thead>
        <tr>
          {heading.map((heading) => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {type === "profile" && (
          <tr>
            <td>{body?.firstName}</td>
            <td>{body?.lastName}</td>
            <td>{body?.role}</td>
            <td>{body?.email}</td>
          </tr>
        )}
      </tbody>

      {type === "orders" && (
        <tbody>
          {body.map((body) => (
            <tr key={body?._id}>
              <td>{body?._id}</td>
              <td>{body?.email}</td>
              <td>
                {body?.payment_status === "pending" ? (
                  <span className="p-1 text-sm italic text-gray-700 rounded-full shadow-md shadow-yellow-700">
                    Pending
                  </span>
                ) : (
                  <span className="p-1 text-sm italic text-gray-700 rounded-full shadow-md shadow-green-700">
                    Success
                  </span>
                )}
              </td>
              <td>{body?.total}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;
