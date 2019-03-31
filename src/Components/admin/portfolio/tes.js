componentDidMount() {
    const parentID = this.props.entityID;
    let portfolio_imgs = [];

    firebaseDB.ref('portfolio_imgs').orderByChild("parentID").equalTo(parentID).once("value", function(snapshot) {
        // console.log(snapshot.val());
        let loop = firebaseLooper(snapshot) ;
        //portfolio_imgs[portfolio_imgs.length] = firebaseLooper(snapshot) ;
        portfolio_imgs.push(firebaseLooper(snapshot)) ;



/*             snapshot.forEach((childSnapshot) => {

            

            let grandChildSnaphot = childSnapshot.val()
            let grandChildSnaphotKey = childSnapshot.key

        }) */

      });
      
      console.log(typeof(portfolio_imgs));
      console.log(this.state.portfolio_imgs);

      this.setState({
        isloading: false,
        portfolio_imgs: portfolio_imgs[0]
    })   

/*         this.setState({
        parentID
    }) */

}

firebaseDB.ref('portfolio_imgs').orderByChild("parentID").equalTo(parentID).once("value")
.then((snapshot) => {
    const portfolio_imgs = firebaseLooper(snapshot);

    this.setState({
        isloading: false,
        portfolio_imgs
    })   
})

