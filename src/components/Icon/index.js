
const BASE_URL = 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/'

const Icon = ({ type }) => {
    return (
      <img
        // src={`@/images/${type}.png`}
        src={`${BASE_URL + type}.svg`}
        style={{
          width: 20,
          height: 20,
        }}
        alt=""
      />
    )
  }
  
  export default Icon