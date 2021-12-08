class RateQuery {
    constructor(){
        this.compRate = [];
        this.sigRate = [];
        this.enjoyRate = [];
    }

    add_rates(comp, sig, enjoy){
        this.compRate.push(comp);
        this.sigRate.push(sig);
        this.enjoyRate.push(enjoy);
    }
}
