const { default: Head } = require("next/head");

const DocHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default DocHead;
