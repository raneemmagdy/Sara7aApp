const emailStructure = (name, link) => `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #eef2f7;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
      color: #ffffff;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 35px;
      color: #444444;
    }
    .content p {
      margin: 20px 0;
      font-size: 17px;
      line-height: 1.8;
    }
    .btn {
      display: inline-block;
      padding: 14px 28px;
      background-color: #bbd0ff;
      color: #ffffff;
      text-decoration: none;
      font-size: 17px;
      border-radius: 50px;
      box-shadow: 0 4px 10px rgba(37, 117, 252, 0.4);
      transition: transform 0.2s, background-color 0.3s,color 0.3s;
    }
    .btn:hover {
      background-color: #2575fc;
      transform: scale(1.05);
      color:#fff
    }
    .footer {
      background-color: #f7f9fc;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>You're Almost There!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Welcome to <strong>Saraha</strong>! Let's finalize your setup.</p>
      <p>Click the button below to verify your email address:</p>
      <p>
        <a href="${link}" class="btn">Verify Now</a>
      </p>
      <p>If you didn't request this, simply ignore this email.</p>
      <p>Best,<br>The Saraha Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Saraha. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export default emailStructure;
