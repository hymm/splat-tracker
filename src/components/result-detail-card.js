import React from 'react';
import {
  Grid,
  Row,
  Col,
  Glyphicon,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Nav,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import { pick, mapKeys } from 'lodash';
import flatten from 'flat';
import { FormattedMessage } from 'react-intl';
import TeamStatsTable from './team-stats-table';
import TeamGearTable from './team-gear-table';
import TeamInfoTable from './team-info-table';
import PanelWithMenu from './panel-with-menu';
import { ResultSummary1, ResultSummary2 } from './result-detail-summary';
import { getGeneralFields, getPlayerFields } from './export-detail-helpers';
import { clipboard, remote } from 'electron';
const { openExternal } = remote.shell;

class ResultDetailMenu extends React.Component {
    getFields() {
        let fields = getGeneralFields();
        fields = fields.concat(getPlayerFields(`player_result`));
        for (let i = 0; i < 3; i++) {
            fields = fields.concat(getPlayerFields(`my_team_members[${i}]`));
        }
        for (let i = 0; i < 4; i++) {
            fields = fields.concat(getPlayerFields(`other_team_members[${i}]`));
        }
        console.log(fields)
        return fields;
    }

    getGeneral(result) {
        const fields = getGeneralFields();
        const picked = pick(result, fields);
        const flattened = flatten(picked);

        const map = {
            'my_team_result.key': 'my_team_result',
            'other_team_result.key': 'other_team_result',
            'game_mode.key': 'game_mode',
            'rule.key': 'rule',
        };

        const mapped = mapKeys(flattened, (value, key) => {
            return map[key] || key
        });

        return mapped;
    }


    getPlayer(player) {
        const fields = getPlayerFields();
        const picked = pick(player, fields);
        const flattened = flatten(picked);

        const map = {
            'player.nickname': 'nick',
            'player.principal_id': 'id',
            'player.weapon.id': 'weapon.id',
            kill_count: 'k',
            assist_count: 'a',
            death_count: 'd',
            special_count: 's',
            game_paint_point: 'p',
        };

        const mapped = mapKeys(flattened, (value, key) => {
            return map[key] || key
        });

        return mapped;
    }

    simplify(result) {
        const simple = this.getGeneral(result);

        simple.my_team = [];

        simple.my_team.push(this.getPlayer(result.player_result));
        for (const player of result.my_team_members) {
            simple.my_team.push(this.getPlayer(player));
        }
        simple.other_team = [];
        for (const player of result.other_team_members) {
            simple.other_team.push(this.getPlayer(player));
        }

        return simple;
    }

    copySimplifiedToJson = () => {
        const { result } = this.props;
        const simplified = this.simplify(result);
        clipboard.writeText(JSON.stringify(simplified))
    }

    copyToJson = () => {
        const { result } = this.props;
        clipboard.writeText(JSON.stringify(result));
    }

    render() {
        return (
            <Nav className={'navbar-right pull-right'}>
                <NavDropdown id={'details-menu'} title={<Glyphicon glyph={'option-vertical'} />} noCaret pullRight>
                    <MenuItem onClick={this.copySimplifiedToJson}>Copy Simplified Json</MenuItem>
                    <MenuItem onClick={this.copyToJson}>Copy Raw Json</MenuItem>
                    <MenuItem divider/>
                    <MenuItem><strike>Save to File</strike></MenuItem>
                </NavDropdown>
            </Nav>
        );
    }
}

class ResultDetailCard extends React.Component {
  state = {
    show: 1
  };

  showStats = () => {
    this.setState({ show: 1 });
  };

  showGear = () => {
    this.setState({ show: 2 });
  };

  showInfo = () => {
    this.setState({ show: 3 });
  };

  render() {
    const { result, statInk } = this.props;
    const linkInfo = statInk[result.battle_number];
    if (!result) {
      return null;
    }

    const myTeam = result.my_team_members.slice(0);
    myTeam.unshift(result.player_result);
    myTeam.sort((a, b) => b.sort_score - a.sort_score);
    const otherTeam = result.other_team_members
      .slice(0)
      .sort((a, b) => b.sort_score - a.sort_score);

    return (
      <PanelWithMenu
        header={
          <h3 className="panel-title">
            {`Battle #${result.battle_number} Details`}
            {linkInfo
              ? <a
                  onClick={() =>
                    openExternal(
                      `https://stat.ink/@${linkInfo.username}/spl2/${linkInfo.battle}`
                    )}
                  style={{ cursor: 'pointer' }}
                >
                  <Glyphicon glyph={'ok-sign'} style={{ paddingLeft: 6 }} />
                </a>
              : null}
          </h3>
        }
        menu={<ResultDetailMenu result={result} />}
      >
        <Grid fluid>
          <Row>
            <Col sm={6} md={6}>
              <ResultSummary1 result={result} />
            </Col>
            <Col sm={6} md={6}>
              <ResultSummary2 result={result} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ButtonToolbar style={{ marginBottom: '10px' }}>
                <ButtonGroup>
                  <Button
                    onClick={this.showStats}
                    active={this.state.show === 1}
                  >
                    Stats
                  </Button>
                  <Button
                    onClick={this.showGear}
                    active={this.state.show === 2}
                  >
                    Gear
                  </Button>
                  <Button
                    onClick={this.showInfo}
                    active={this.state.show === 3}
                  >
                    More Info
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row>
            <Col sm={6} md={6}>
              <h4>My Team</h4>
              {this.state.show === 1 ? <TeamStatsTable team={myTeam} /> : null}
              {this.state.show === 2 ? <TeamGearTable team={myTeam} /> : null}
              {this.state.show === 3 ? <TeamInfoTable team={myTeam} /> : null}
            </Col>
            <Col sm={6} md={6}>
              <h4>Enemy Team</h4>
              {this.state.show === 1
                ? <TeamStatsTable team={otherTeam} />
                : null}
              {this.state.show === 2
                ? <TeamGearTable team={otherTeam} />
                : null}
              {this.state.show === 3
                ? <TeamInfoTable team={otherTeam} />
                : null}
            </Col>
          </Row>
        </Grid>
      </PanelWithMenu>
    );
  }
}

export default ResultDetailCard;
