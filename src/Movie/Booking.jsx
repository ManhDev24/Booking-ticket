import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css'
import { TYPE_CHANGE, TYPE_DELETE, TYPE_PAY } from './action'
class Booking extends Component {
  render() {
    const { list, bookingList, onSelected, onDeleted, onPay } = this.props
    return (
      <div className="container mt-5">
        <h1>Book vé xem phim</h1>
        <div className="row">
          <div className="col-7">
            <h3>Màn hình</h3>
            <div className="chair-container">
              {list.map((item, rowIndex) => {
                const firstRow = rowIndex === 0
                const danhSachGhe = item.danhSachGhe
                return (
                  <div
                    className="chair-row"
                    key={`list-danh-sach-ghe=${rowIndex}`}
                  >
                    <div className="type">{firstRow ? '' : item.hang}</div>
                    {danhSachGhe.map((ghe, chairIndex) => (
                      <div
                        key={`danh-sach-ghe=${chairIndex}`}
                        className={`${firstRow ? 'ghe-zero' : 'ghe'} ${
                          ghe.daDat ? 'gheDuocChon' : ''
                        } ${ghe.dangChon ? 'gheDangChon' : ''}`}
                        onClick={() => {
                          if (firstRow || ghe.daDat || ghe.dangChon) {
                            return
                          }
                          const data = { hang: item.hang, ...ghe }
                          onSelected(data)
                        }}
                      >
                        {ghe.soGhe}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-5">
            <h3>Số ghế đã đặt</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginTop: 40,
              }}
            >
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <div className="gheDuocChon"></div>
                <p>Ghế đã đặt</p>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <div className="gheDangChon"></div>
                <p>Ghế đang đặt</p>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <div className="ghe"></div>
                <p>Ghế chưa đặt</p>
              </div>
            </div>
            <table className="table">
              <thead>
                <th>Số ghế</th>
                <th>Giá</th>
                <th>Huỷ</th>
              </thead>
              <tbody>
                {bookingList.map((item) => {
                  return (
                    <tr>
                      <td>{item.soGhe}</td>
                      <td>{item.gia}</td>
                      <td>
                        <button
                          onClick={() => {
                            onDeleted(item)
                          }}
                          className="btn btn-danger"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {bookingList.length > 0 && (
              <div style={{ textAlign: 'end' }}>
                <button
                  onClick={() => {
                    onPay()
                  }}
                  className="btn btn-success"
                >
                  Thanh Toán
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.movieReducer.list,
    bookingList: state.movieReducer.bookingList,
  }
}
const mapDispathToProps = (dispath) => {
  return {
    onSelected: (data) => {
      dispath({ type: TYPE_CHANGE, payload: data })
    },
    onDeleted: (data) => {
      dispath({ type: TYPE_DELETE, payload: data })
    },
    onPay: (data) => {
      dispath({ type: TYPE_PAY })
    },
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Booking)
