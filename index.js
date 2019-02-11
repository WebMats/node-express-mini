const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());



app.use('/api/users', router);

router.post('', (req, res, next) => {

})
router.get('', (req, res, next) => {
    console.log('ACTIVE')
})
router.get('/:id', (req, res, next) => {
    
})
router.delete('/:id', (req, res, next) => {
    
})
router.put('/:id', (req, res, next) => {
    
})




app.listen(4000, () => {
    console.log('Listening on port 4000...')
})