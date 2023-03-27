import { useSelector, useDispatch } from 'react-redux';
import config from '../config.json';

import { loadTokens } from '../store/interactions';

const Markets = () => {
  const provider = useSelector((state) => state.provider.connection);
  const chainId = useSelector((state) => state.provider.chainId);

  const dispatch = useDispatch();

  const marketHandler = async (e) => {
    await loadTokens(provider, e.target.value.split(','), dispatch);
  };

  return (
    <div className="component exchange__markets">
      <div className="component__header"></div>
      <h2>Select Market</h2>

      {chainId && config[chainId] ? (
        <select name="markets" id="markets" onChange={marketHandler}>
          <option
            value={`${config[chainId].Nox.address},${config[chainId].Spud.address}`}
          >
            Nox / Spud
          </option>

          <option
            value={`${config[chainId].Nox.address},${config[chainId].NFL.address}`}
          >
            Nox / NFL
          </option>
        </select>
      ) : (
        <div>
          <p>Not Deployed to Network</p>
        </div>
      )}

      <hr />
    </div>
  );
};

export default Markets;
