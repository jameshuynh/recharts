/**
 * @fileOverview Polygon
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import pureRender from '../util/PureRender';
import { PRESENTATION_ATTRIBUTES, getPresentationAttributes,
  filterEventAttributes } from '../util/ReactUtils';

const getPolygonPoints = points => (
  points.reduce((result, entry) => {
    if (entry.x === +entry.x && entry.y === +entry.y) {
      result.push([entry.x, entry.y]);
    }

    return result;
  }, []).join(' ')
);

@pureRender
class Polygon extends Component {

  static displayName = 'Polygon';

  static propTypes = {
    ...PRESENTATION_ATTRIBUTES,
    className: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })),
  };

  render() {
    const { points, className } = this.props;

    if (!points || !points.length) { return null; }

    const layerClass = classNames('recharts-polygon', className);
    const svgPoints = [];
    if (layerClass.indexOf('recharts-polar-angle-axis') === -1) {
      for (let i = 0; i < points.length; i++) {
        svgPoints.push(
          <circle
            cx={points[i].x}
            cy={points[i].y}
            r={6}
            stroke="#E0E0E0"
            strokeWidth="4"
            fill="#E52389"
          />
        );
      }
    }

    return (
      <g>

        {svgPoints}
        <polygon
          {...getPresentationAttributes(this.props)}
          {...filterEventAttributes(this.props)}
          className={layerClass}
          points={getPolygonPoints(points)}
        />
      </g>
    );
  }
}

export default Polygon;
