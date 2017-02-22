var React = require('react');
var _throttle = require('lodash/throttle');

class ScrollWithViewport extends React.Component {

    constructor(props) {
        super(props);
        this.handleWindowScroll = this.handleWindowScroll.bind(this);
        this.throttledWindowScroll = _throttle(this.handleWindowScroll, 150).bind(this);

        this.state = {
            isEnabled: this.props.isEnabled,
            position: this.props.styles.position,
            width: this.props.styles.width,
            top: this.props.styles.top
        }
    }

    componentDidMount() {
        if (!window || !document) return;
        this.supportPageOffset = window.pageXOffset !== undefined;
        this.isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        window.addEventListener('scroll', this.throttledWindowScroll);
    }

    componentWillUnmount() {
        if (!window) return;
        window.removeEventListener("scroll", this.throttledWindowScroll);        
    }

    handleWindowScroll() {

        let elementOffset = this.contentContainer.offsetTop,            
            y = this.supportPageOffset ? window.pageYOffset : this.isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;;

        if (y > elementOffset) {
            this.setState({
                position: 'fixed',
                width: this.scrollContainer.clientWidth
            })
        } else {
            this.setState({
                position: this.props.styles.position,
                width: this.props.styles.width
            });
        }
    }

    render() {

        return (
            <div ref={(el) => this.scrollContainer = el}>

               <div ref={(el) => this.contentContainer = el} style={this.state}>

                   {this.props.children}
               
               </div>

            </div>
        );

    }
};

ScrollWithViewport.defaultProps = {
    isEnabled: true,
    styles: {
        position: 'static',
        width: '100%',
        top: 0
    }
};

module.exports = ScrollWithViewport;
