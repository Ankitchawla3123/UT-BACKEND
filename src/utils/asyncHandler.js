const aysncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    next(err);
    //  IT WILL SEND TO Global error handler WHICH SETS STATUS CODES LIKE BELOW
    //     app.use((err, req, res, next) => {
    //   console.error(err.stack);
    //   res.status(500).json({ error: err.message || 'Internal Server Error' });
    // });
    // NODE JS ERROR CLASS SETUP
  });
};

// const aysncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export { aysncHandler };

// use case of aysnc handler  in destructured format / raw

// app.get('/user', asyncHandler(async (req, res) => {
//   const user = await getUserFromDB(); // throws error
//   res.send(user); // won't be reached
// }));

// function will be passed to async hanlder with req and res  and wil be executed inside
// fn(req, res, next)

// here it will directly execute as no call back but but what actually will happen is on direct execcution async handler returns a callback that will be put there in that place, so technically in the end we calling our actuall aysnc function in call back with req , res and next with error also handled with try catch or or wwith promise
