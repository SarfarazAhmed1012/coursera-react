import {Component} from 'react';
import Menu from './MenuComponent';
import Header from './HeaderCompnent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import { postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition, } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

// what we are doing here is that the postComment will return an action object for adding a comment, and then
// that action object is given as parameter to the dispatch function, and that we are supplying to the postComment
// which later can be used within our Main Component.
const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))


});



class Main extends Component {

  constructor(props) {
    super(props);

  }

  // this will ensure when main component is mounted, then it also will fetch all these below from the server.
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchLeaders();
    
  }

  onDishSelect(dishId){

    this.setState({selectedDish: dishId});
}

  render() {

    const HomePage = () => {
      return(
        <Home
        dish={
            this.props.dishes.dishes.filter(dish => dish.featured)[0]
        }
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}

        promotion={
            this.props.promotions.promotions.filter(promo => promo.featured)[0]
        }
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}

        leader={
            this.props.leaders.leaders.filter(leader => leader.featured)[0]
        }
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}

    />
      );
    }

    const AboutUsPage = () => {
      return(
          <About 
              leaders={this.props.leaders.leaders}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
          />
      );
  };

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
      />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}> 
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                  <Route exact path="/aboutus" component={ AboutUsPage } />
                  <Redirect to="/home" />
              </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));