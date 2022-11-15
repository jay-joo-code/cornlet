const sendEmail = require('./sendEmail');

const sendBanNotifEmail = ({
  bannedUserEmail,
  bannedUserName,
  firstMsgContent,
}) => {
  const subject = `[cornlet] ${bannedUserName} ${bannedUserEmail} was banned`;

  const html = `
    <div>
      <div>
        ${bannedUserName} ${bannedUserEmail} was banned for sending this message:
      </div>
      <br />
      <div>
        "${firstMsgContent}"
      </div>
      <br /><br />
      <div>
        THIS IS A COMPUTER GENERATED EMAIL. PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL.
      </div>
      <div style="color:white;">
        Tag: ${Math.random()}
      </div>
    </div>
  `;

  sendEmail('jj534@cornell.edu', subject, html);
};

module.exports = sendBanNotifEmail;
