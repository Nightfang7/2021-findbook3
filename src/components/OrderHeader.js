export default function ShippingHeader(props) {

  return (
    <div className="orderheader">
      <div className="orderheader-wrap">
        <div className="orderheader-text">
          <h1 className="orderheader-title" >{props.title}</h1>
        </div>
      </div>
    </div>
  );
}
