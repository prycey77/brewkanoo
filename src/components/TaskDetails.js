import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';




export class TaskDetails extends Component {

  constructor(props) {
    super(props);
    this.divisor = this.props.batchSize/25;
  }

  render() {
    return (
      <div>
        {this.whichStep()}
      </div>
    )
  }

  whichStep() {
    // rename this method and maybe look into switch to make more DRY
    if (this.props.stepNumber === 1) {
      return this.step1();
    } else if (this.props.stepNumber === 2) {
      return this.step2();
    } else if (this.props.stepNumber === 3) {
      return this.step3();
    } else if (this.props.stepNumber === 4) {
      return this.step4(); 
    } else if (this.props.stepNumber === 5) {
      return this.step5();
    } else if (this.props.stepNumber === 6) {
      return this.step6();
    } else if (this.props.stepNumber === 7) {
      return this.step7();
    } else if (this.props.stepNumber === 8) {
      return this.step8();
    } else if (this.props.stepNumber === 9) {
      return this.step9();
    }
  }


  step1() {
    var a = this.formatStrikeWater(this.props.task.strikeWater)
    var b = this.formatMashTemp(this.props.specs.mashTemp)
    var c = this.formatGrains()
    return this.formatTable(a, b, c)
  }

  step2() {
    return this.formatTable(this.formatSpargeWater(this.props.task.spargeWater))
  }
  
  step3() {
    return this.formatTable()
  }

  step4() {
    return this.formatTable(this.formatBitteringHops())
  }

  step5() {
    return this.formatTable(this.formatFlavouringHops())
  }

  step6() {
    return this.formatTable(this.formatAromaHops())
  }

  step7() {
    return this.formatTable()
  }

  step8() {
    return this.formatTable()
  }

  step9() {
    return (
      <div>
        {this.formatTable(this.formatPrimingSugar())}
      </div>
    )
  }

  showButton(){
      if(this.props.task.info !== null ) {
      return<button class="help-button" data-toggle="tooltip" data-placement="top" title={this.props.task.info} > ? </button>
    }
  }

  formatTable(details, details2=null, details3=null) {
    return (
      <div class="taskDetails">
          {details ? <td>{details}{details2}{details3}</td> : null}     
      </div>
    )
  }

  formatGrains() {
    if (this.props.task.description.includes("grain")) {
      return this.props.ingredients.grains.map(grain => {
        return (<p>{grain.item}, {grain.quantity*this.divisor.toFixed(2)} kg</p>)
      })
    }
  }

  formatPrimingSugar() {
    if (this.props.task.description.includes("bottle")) {
      return (<p>{this.props.ingredients.primingSugar} g of priming sugar per 500mL bottle</p>)
    }
  }

  formatBitteringHops() {
    if (this.props.task.description.includes("Weigh")) {
      return this.props.ingredients.hops.map(hop => {
        if (hop.type === "Bittering") {
          return (<p>{hop.item}, {(hop.quantity*this.divisor).toFixed(2)} g</p>)
        }
      })
    }
  }

  formatFlavouringHops() {
    if (this.props.task.description.includes("Weigh")) {
      return this.props.ingredients.hops.map(hop => {
        if (hop.type === "Flavouring") {
          return (<p>{hop.item}, {(hop.quantity*this.divisor).toFixed(2)} g</p>)
        }
      })
    }
  }

  formatAromaHops() {
    if (this.props.task.description.includes("Weigh")) {
      return this.props.ingredients.hops.map(hop => {
        if (hop.type === "Aroma") {
          return (<p>{hop.item}, {(hop.quantity*this.divisor).toFixed(2)} g</p>)
        }
      })
    }
  }

  formatStrikeWater(volume) {
    if (this.props.task.description.includes("water")) {
      return (<p>{(volume*this.divisor).toFixed(2).toString()} Litres</p>)
    }
  }

  formatSpargeWater(volume) {
    if (this.props.task.description.includes("sparge")) {
      return (<p>{(volume*this.divisor).toFixed(2).toString()} Litres</p>)
    }
  }

  formatMashTemp(temp) {
    if (this.props.task.description.includes("water")) {
      temp += 8
      return (<p>{temp.toString()} degrees C</p>)
    }
  }
}

 

const tableStyle = {
  border: 'none',
  boxShadow: 'none'
}

export default TaskDetails
