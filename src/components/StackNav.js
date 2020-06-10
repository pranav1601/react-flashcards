import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import TabNav from "./TabNav";
import NewCard from "./NewCard";
import Quiz from "./Quiz";
import DeckView from "./DeckDashboard";
const StackNav = createStackNavigator( {
    Home: {
        screen: TabNav,
        navigationOptions: {
            headerShown: false
        }
    },

    DeckView: {
        screen: DeckView,
        navigationOptions: ( { navigation } ) => ( {
            title: navigation.state.params.text
        } )
    },
    AddCard: {
        screen: NewCard,

    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ( { navigation } ) => ( {
            title: navigation.state.params.text
        } )
    }

} );
export default createAppContainer( StackNav );
