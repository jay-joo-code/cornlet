const sendEmail = require('./sendEmail');

const sendBanNotifEmail = ({
  msg,
  bannedUserEmail,
  bannedUserName,
  bannedUserUid,
}) => {
  const subject = `[cornlet] ${bannedUserName} ${bannedUserEmail} has sent a suspicious message`;

  const html = `
    <div>
      <div>
        ${bannedUserName} ${bannedUserEmail} (${bannedUserUid}) has sent a suspicious message:
      </div>
      <br />
      <div>
        "${msg}"
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
