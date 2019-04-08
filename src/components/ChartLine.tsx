import { makeStyles } from '@material-ui/styles'
import { ResponsiveLine } from '@nivo/line'
import React, { FunctionComponent } from 'react'

type Props = { data: any }

const ChartLine: FunctionComponent<Props> = ({ data }) => {
  const classes = useStyles({})

  return (
    <div className={classes.root}>
      <ResponsiveLine
        data={data}
        enableDots={false}
        enableGridX={false}
        enableGridY={false}
        lineWidth={1}
        enableArea={true}
        isInteractive={false}
        animate={false}
      />
    </div>
  )
}

const useStyles = makeStyles(({ spacing }) => {
  return {
    root: {
      border: '1px solid lightgray',
      borderRadius: 4,
      height: `${spacing(20)}px`,
      width: `${100}%`
    }
  }
})

export default ChartLine
